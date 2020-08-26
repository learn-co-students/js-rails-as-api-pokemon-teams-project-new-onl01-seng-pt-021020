class PokemonsController < ApplicationController

    def index 
        pokemons = Pokemon.all
        render json: pokemons
    end

    def show 
        pokemon = Pokemon.find_by(id: params[:id])
        if pokemon
            render json: pokemon
        else
            render json: { message: "Pokemon with the id of #{params[:id]} has not been found" }
        end
    end

    def create 
        trainer = Trainer.find_by(id: params[:trainer_id])
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
        pokemon.delete
    end

end
