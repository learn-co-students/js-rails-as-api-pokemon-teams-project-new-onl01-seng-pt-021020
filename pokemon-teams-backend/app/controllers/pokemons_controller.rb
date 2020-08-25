class PokemonsController < ApplicationController
    def create
        name = Faker::Name.name
        species = Faker::Games::Pokemon.name
        trainer_id = params["_json"]
        new_pokemon = Pokemon.create(nickname: name, species: species, trainer_id: trainer_id)
        render json: new_pokemon
    end

    def destroy
        trainer = Trainer.find_by(id: params[:attributes][:trainer_id])
        pokemon = trainer.pokemons.find_by(id: params[:id])
        pokemon.destroy
    end
end
