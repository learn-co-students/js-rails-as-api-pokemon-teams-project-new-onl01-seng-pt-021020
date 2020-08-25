class PokemonsController < ApplicationController
    def show
        pokemon = Pokemon.find_by(id: params[:id])
        render json: pokemon
    end

    def index
        pokemons = Pokemon.all 
        render json: pokemons
    end

    def create
        trainer = Trainer.find_by(id: params[:trainer_id])
        pokemon = trainer.pokemons.build(
            {
                nickname: Faker::Name.first_name,
                species: Faker::Games::Pokemon.name
            }
        )
        if pokemon.save
            render json: pokemon
        else
            render json: {message: pokemon.errors.messages[:too_many][0]}
        end
    end

    def destroy
        pokemon = Pokemon.find_by(id: params[:id])
        pokemon.destroy
    end
    
end
