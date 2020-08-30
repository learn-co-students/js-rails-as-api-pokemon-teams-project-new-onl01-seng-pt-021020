class PokemonsController < ApplicationController
  def index
    pokemons = Pokemon.all
    render json: MultiJson.dump(pokemons)
  end
end
