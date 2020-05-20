## usersテーブル
|Column|Type|Options|
|------|----|-------|
|id|integer| |
|nickname|string|null: false,unique: true|
|email|string|null: false,unique: true|
|encrypted_password|string|null: false|


### Association
- has_many :messages
- has_many :groups, thruogh: groups-users



## messagesテーブル
|Column|Type|Options|
|------|----|-------|
|id|integer| |
|content|string| |
|image|string| |
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :user
- belongs_to :group



## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|id|integer| |
|name|string|null: false, unique: true|



### Association
- has_many	:messages 
- has_many	:users , through: groups-users 



## groups_usersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|



### Association
- belongs_to :group
- belongs_to :user