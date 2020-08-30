class TrainersController < ApplicationController
  def index
    trainers = [Trainer.all].to_h
    pokemons = trainers.collect do |trainer|
      trainer.pokemons
    end
    trainers.pokemons = pokemons
    render json: MultiJson(trainers)
  end
end
