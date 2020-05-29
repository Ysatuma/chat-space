FactoryBot.define do

  factory :message do

    content {Faker::Creature::Animal.name}
    image  { File.open("#{Rails.root}/spec/fixtures/test_cat.jpg") }
    user
    group
  end

end
