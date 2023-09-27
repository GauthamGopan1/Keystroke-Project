import com.fasterxml.jackson.databind.ObjectMapper;
import com.fiserv.commercehub.controller.CustomerController;
import com.fiserv.commercehub.model.Customer;
import com.fiserv.commercehub.repository.CustomerRepository;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

//@WebMvcTest(CustomerController.class)
@SpringBootTest
public class CustomerControllerTest {

    @MockBean
    private CustomerRepository customerRepository;

    @Test
    public void customerTest() {
        Customer customer = new Customer(2, "jane.doe@gmail.com", "password", true);
        // Add assertions or further test logic for the customer object
    }
}
