package test.declaration;

import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;

@Path("/dbtest")
public class DatabaseTest {
    
    @GET
    @Produces(MediaType.TEXT_PLAIN)
    public String test() {
        return PersistenceService.getInstance().test();
    }

}
