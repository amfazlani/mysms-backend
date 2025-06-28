# app/controllers/api/messages_controller.rb
class Api::MessagesController < ApplicationController
  before_action :authenticate_user!

  def index
    messages = current_user.messages.order(created_at: :desc)
    render json: messages
  end

  def create
    client = Twilio::REST::Client.new(ENV["TWILIO_SID"], ENV["TWILIO_TOKEN"])
    to = params[:to]
    body = params[:body]

    sms = client.messages.create(
      from: ENV["TWILIO_PHONE"],
      to: to,
      body: body,
      status_callback: "#{ENV['BASE_URL']}/api/messages/status"
    )

    message = current_user.messages.build(
      to: to,
      body: body,
      status: "queued",
      sid: sms.sid,
      session_id: @session_id
    )

    if message.save
      render json: message, status: :created
    else
      render json: { errors: message.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def status
    msg = Message.find_by(sid: params[:MessageSid])
    msg.update(status: params[:MessageStatus]) if msg
    head :ok
  end
end
