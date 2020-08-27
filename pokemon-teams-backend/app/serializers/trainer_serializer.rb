class TrainerSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name, :id
  has_many :pokemons
end
