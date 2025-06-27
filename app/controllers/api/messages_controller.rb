# app/controllers/api/messages_controller.rb
class Api::MessagesController < ApplicationController
  include ActionController::Cookies

  before_action :set_session_id

  def index
    messages = Message.where(session_id: @session_id)
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

    message = Message.create!(
      to: to,
      body: body,
      status: "queued",
      sid: sms.sid,
      session_id: @session_id
    )

    render json: message, status: :created
  end

  def status
    msg = Message.find_by(sid: params[:MessageSid])
    msg.update(status: params[:MessageStatus]) if msg
    head :ok
  end

  private

  def set_session_id
    session[:session_id] ||= SecureRandom.hex(10)
    @session_id = session[:session_id]
  end
end
