# app/models/message.rb
class Message
  include Mongoid::Document
  include Mongoid::Timestamps

  field :id, type: String
  field :to, type: String
  field :from, type: String
  field :body, type: String
  field :status, type: String
  field :sid, type: String
  field :session_id, type: String

  belongs_to :user

  validates :status, inclusion: { in: %w[queued sending sent delivered undelivered failed], message: "%{value} is not a valid status" }
  validates :to, presence: true
  validates :from, presence: true
  validates :sid, presence: true
end
