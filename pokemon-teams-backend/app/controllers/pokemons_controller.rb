class PokemonsController < ApplicationController
  def index
    pokemons = Pokemon.all
    render json: PokemonSerializer.new(pokemons)
  end

  def create
    trainer = Trainer.find(params[:trainer_id])
    pokemon = trainer.pokemons.build({
        nickname: Faker::Name.first_name,
        species: Faker::Games::Pokemon.name
    })
    if pokemon.save
        render json: pokemon
    else
        render json: {message: pokemon.errors.messages[:team_max][0]}
    end
  end

  def destroy
    pokemon = Pokemon.find_by(id: params[:id])
    pokemon.delete_all
  end
end
