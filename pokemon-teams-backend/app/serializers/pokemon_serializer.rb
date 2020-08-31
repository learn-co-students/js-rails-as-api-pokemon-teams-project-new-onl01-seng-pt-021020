class PokemonSerializer
  include FastJsonapi::ObjectSerializer
  attributes :nickname, :id

  belongs_to :trainer
end
