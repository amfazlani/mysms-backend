# app/models/message.rb
class Message
  include Mongoid::Document
  include Mongoid::Timestamps

  field :to, type: String
  field :body, type: String
  field :status, type: String
  field :sid, type: String
  field :session_id, type: String

  index({ session_id: 1 })
end
