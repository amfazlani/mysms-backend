# app/controllers/api/messages_controller.rb
class Api::MessagesController < ApplicationController
  before_action :authenticate_user!, except: [:status]

  def index
    messages = current_user.messages.order(created_at: :desc)
    render json: messages
  end

  def create
    sms = TwilioService.new(params[:to], params[:body]).perform

    msg = build_message(params[:to], params[:body], sms.sid)

    if msg.save
      render json: msg, status: :created
    else
      render json: { errors: msg.errors.full_messages }, status: :unprocessable_entity
    end

  rescue Twilio::REST::RestError => e
    render json: { errors: [e.message] }, status: :unprocessable_entity
  end

  def status
    msg = Message.find_by(sid: params[:MessageSid])

    if msg
      msg.update(status: params[:MessageStatus])

      MessagesChannel.broadcast_to(msg.user, {
        id: msg.id,
        sid: msg.sid,
        status: msg.status
      })
    end

    head :ok
  end

  private

  def build_message(to, body, sid)
    current_user.messages.build(
      from: ENV['TWILIO_PHONE'],
      to: to,
      body: body,
      status: "queued",
      sid: sid
    )
  end
end
