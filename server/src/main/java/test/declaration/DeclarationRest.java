package test.declaration;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.ws.rs.FormParam;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.CacheControl;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

@Path("declaration")
public class DeclarationRest {
    private List<Declaration> data = new ArrayList<Declaration>();
    private final ObjectMapper mapper = new ObjectMapper();

    public DeclarationRest() {
        data.add(new Declaration("Andrew", 38.0f, true, false, System.currentTimeMillis()-500000));
        data.add(new Declaration("Bob", 37.0f, true, false, System.currentTimeMillis()-400000));
        data.add(new Declaration("Charlie", 37.5f, true, true, System.currentTimeMillis()-300000));
        data.add(new Declaration("Droid", 35.7f, false, true, System.currentTimeMillis()-200000));
        data.add(new Declaration("Luke", 36.5f, false, false, System.currentTimeMillis()-100000));
    }


    @GET
    @Path("list-all")
    @Produces(MediaType.APPLICATION_JSON)
    public Response listAll() {
        try {
            String result = mapper.writeValueAsString(data);
            return Response.ok().entity(result).cacheControl(CacheControl.valueOf("no-cache, no-store")).build();
        } catch (Exception e) {
            System.err.println("Failed to list all");
            e.printStackTrace();
            return Response.serverError().build();
        }
    }

    @GET
    @Path("list-all-db")
    @Produces(MediaType.APPLICATION_JSON)
    public Response listAllDb() {
        try {
            Collection<Declaration> decls = PersistenceService.getInstance().listAll();
            String result = mapper.writeValueAsString(decls);
            return Response.ok().entity(result).cacheControl(CacheControl.valueOf("no-cache, no-store")).build();
        } catch (Exception e) {
            System.err.println("Failed to list all from db");
            e.printStackTrace();
            return Response.serverError().build();
        }
    }

    @POST
    @Path("submit")
    @Produces(MediaType.APPLICATION_JSON)
    public Response submit(@FormParam("username") String username, @FormParam("temperature")String temperature, @FormParam("symptoms") boolean hasSymptoms, @FormParam("closecontact") boolean isCloseContact) {
        try {
            Declaration decl = new Declaration(username, Float.parseFloat(temperature), hasSymptoms, isCloseContact, System.currentTimeMillis());
            data.add(decl);
            String result = mapper.writeValueAsString(decl);
            return Response.accepted().entity(result).build();
        } catch (Exception e) {
            System.err.println("Failed to submit: "+username);
            e.printStackTrace();
            return Response.serverError().build();
        }
    }

    @POST
    @Path("submit-db")
    @Produces(MediaType.APPLICATION_JSON)
    public Response submitDb(@FormParam("username") String username, @FormParam("temperature")String temperature, @FormParam("symptoms") boolean hasSymptoms, @FormParam("closecontact") boolean isCloseContact) {
        try {
            Declaration decl = new Declaration(username, Float.parseFloat(temperature), hasSymptoms, isCloseContact, System.currentTimeMillis());
            PersistenceService.getInstance().save(decl);

            String result = mapper.writeValueAsString(decl);
            return Response.accepted().entity(result).build();
        } catch (Exception e) {
            System.err.println("Failed to submit db: "+username);
            e.printStackTrace();
            return Response.serverError().build();
        }
    }
}
