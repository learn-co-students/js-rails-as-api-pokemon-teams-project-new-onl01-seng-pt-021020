class TrainersController < ApplicationController
    def index
        trainers = Trainer.all
        render json: trainers.to_json(:only => [:id, :name], :include => {:pokemons => {:only => [:id, :nickname, :species, :trainer_id]}})
    end

    def show
        trainer = Trainer.find(params[:id])
        render json: trainer 
    end
end
