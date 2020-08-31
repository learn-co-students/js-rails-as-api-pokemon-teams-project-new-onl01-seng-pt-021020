Rails.application.routes.draw do
  resources :pokemons
  resources :trainers
  post '/pokemons', to: 'pokemons#create'
  delete '/pokemons/:id', to: 'pokemons#destroy'
  get '/trainers', to: 'trainers#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end

