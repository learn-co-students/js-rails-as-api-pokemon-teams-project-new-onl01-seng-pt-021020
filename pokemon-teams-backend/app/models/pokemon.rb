class Pokemon < ApplicationRecord
  belongs_to :trainer

  validate do 
    valid_pokemon_count?
  end

  private

  def valid_pokemon_count?
    if self.trainer.pokemons.count >= 6
      self.errors.add(:team_max, "Can only have 6 pokemon in the party")
    end
  end

end
