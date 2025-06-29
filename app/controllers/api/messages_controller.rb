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

    if message.save
      render json: message, status: :created
    else
      render json: { errors: message.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def status
    msg = Message.find_by(sid: params[:MessageSid])

    if msg
      msg.update(status: params[:MessageStatus])
    end

    head :ok
  end

  private

  def build_message(to, body, sid)
    current_user.messages.build(
      to: to,
      body: body,
      status: "queued",
      sid: sid
    )
  end
end
