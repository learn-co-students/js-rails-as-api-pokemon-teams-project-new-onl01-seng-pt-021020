class PokemonsController < ApplicationController

  def index
    pokemons = Pokemon.all
    render json: pokemons
    #all pokemons of all trainers
  end

  def show
    pokemon = Pokemon.find(params[:id])
    render json: pokemon
    #all pokemons of one trainer
  end

end
