require 'test_helper'
class BoggleControllerTest < ActionController::TestCase 
    test 'boggle_controller_get_request_should_return_200' do 
        get :index
        assert_response :success 
    end
end
