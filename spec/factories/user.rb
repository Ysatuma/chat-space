FactoryBot.define do

  factory :user do
    
    password = Faker::Internet.password(min_length: 8)
    nickname {Faker::Name.first_name}
    email {Faker::Internet.email}
    password {password}
    password_confirmation {password}

  end

end
