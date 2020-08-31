class TrainersController < ApplicationController

  def index
    trainers = Trainer.all
    render json: trainers, include: [:pokemons]
    #all pokemons of all trainers
  end

  def show
    trainer = Trainer.find(params[:id])
    render json: trainer, include: [:pokemons]
    #all pokemons of one trainer 
  end

end
