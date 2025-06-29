class TwilioService
  attr_reader :to, :body

  def initialize(to, body)
    @to = to
    @body = body
  end

  def perform
    client.messages.create(
      from: ENV["TWILIO_PHONE"],
      to: to,
      body: body,
      status_callback: "#{ENV['BASE_URL']}/api/messages/status"
    )
  end

  private

  def client
    @client ||= Twilio::REST::Client.new(ENV["TWILIO_SID"], ENV["TWILIO_TOKEN"])
  end
end
