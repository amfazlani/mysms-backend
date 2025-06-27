# config/routes.rb
Rails.application.routes.draw do
  namespace :api do
    resources :messages, only: [:index, :create]
    post "messages/status", to: "messages#status"
  end
end
