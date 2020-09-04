class PokemonsController < ApplicationController
  def index
    pokemons = Pokemon.all
    render json: pokemons
  end

  def destroy
    pokemon = Pokemon.find(params[:id])
    pokemon.destroy
  end
end
