class ApplicationController < ActionController::API
  include ActionController::Cookies
  include ActionController::RequestForgeryProtection
  include ActionController::Flash  # << This adds flash support
  include DeviseTokenAuth::Concerns::SetUserByToken

  protect_from_forgery with: :exception  # Optional if you want CSRF

  protect_from_forgery with: :null_session  # <- Disable CSRF checking
end
