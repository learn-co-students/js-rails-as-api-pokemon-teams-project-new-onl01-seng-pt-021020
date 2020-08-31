class Pokemon < ApplicationRecord
  belongs_to :trainer

  validate do
    pokemon_count_valid?
  end

  private

  def pokemon_count_valid?
    if self.trainer.pokemons.count >= 6
      self.errors.add(:team_max, "The maximum number of pokemons is 6.")
    end
  end

  #pokemon JSON will have
    #their own id handled by the db
    #a species
    #a nickname
    #trainer_id
    # "pokemons":[{"id":1,"species":"Seel","nickname":"Arnulfo","trainer_id":1}

  #instance method. self is instance of pokemon class.

end
