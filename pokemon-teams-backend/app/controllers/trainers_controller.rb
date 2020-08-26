class TrainersController < ApplicationController

    def index
        trainers = Trainer.all
        render json: trainers, include: [:pokemons]
    end

    def show
        trainer = Trainer.find_by(id: params[:id])
        if trainer
            render json: trainer, include: [:pokemons]
        else
            render json: { message: "Pokemon Trainer with the id of '#{params[:id]}' has not been found" }
        end
    end

end
