class TrainersController < ApplicationController
  def index
    trainers = Trainer.all
    render json: trainers
  end

  def update
    trainer = Trainer.find(params[:id])
    
    if trainer.pokemons.length < 6
      pokemon = Pokemon.all.sample
      while trainer.pokemons.include?(pokemon) do
        pokemon = Pokemon.all.sample
      end
      trainer.pokemons << pokemon
      trainer.save
    end

    render json: trainer
  end
end
