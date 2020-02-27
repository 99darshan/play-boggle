class BoggleController < ApplicationController
    def index
        render json:{status:'SUCESS FROM index route'}
    end
end