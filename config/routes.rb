# config/routes.rb
Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'auth'

  namespace :api do
    resources :messages, only: [:index, :create]
    post "messages/status", to: "messages#status"
  end
end
