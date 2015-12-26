class Listing < ActiveRecord::Base
	has_attached_file :image, 
										styles: { medium: "200x", thumb: "100x100>" }, 
										default_url: "https://s3.amazonaws.com/kazijams/listings/missing.png",
										:storage => :s3,
                    :s3_credentials => Proc.new{|a| a.instance.s3_credentials }

  validates_attachment_content_type :image, content_type: /\Aimage\/.*\Z/

  def s3_credentials
    {:bucket => ENV["directory"], :access_key_id => ENV["aws_access_key_id"], :secret_access_key => ENV["aws_secret_access_key"]}
  end

  validates :name, :description, :price, presence: true
  validates :price, numericality: { greater_than: 0 }
  validates_attachment_presence :image

  belongs_to :user
  has_many :orders
end
