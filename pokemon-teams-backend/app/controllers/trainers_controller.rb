class TrainersController < ApplicationController
  def index
    trainers = Trainer.all
    pokemons = trainers.collect do |trainer|
      trainer.pokemons
    end
    trainers = MultiJson.load(MultiJson.dump(trainers))
    pokemons = MultiJson.load(MultiJson.dump(pokemons))

    trainers.each.with_index do |trainer, i|
      trainer.except!('created_at', 'updated_at')

      pokemons[i].each do |pokemon|
        pokemon.except!('created_at', 'updated_at')
      end

      trainer['pokemons'] = pokemons[i]
    end

    render json: MultiJson.dump(trainers)
  end

  def update
    trainer = Trainer.find(params[:id])
    
    if trainer.pokemons.length < 6
      trainer.pokemons << Pokemon.all.sample
      trainer.save
    end

    render json: MultiJson.dump(Trainer.all)
  end
end
