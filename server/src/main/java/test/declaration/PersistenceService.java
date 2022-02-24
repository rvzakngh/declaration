package test.declaration;

import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.Collection;
import java.util.LinkedList;
import java.util.List;

import org.jose4j.base64url.Base64Url;

/**
 * Persistence service to facilitate interaction with stored data (DB in this case)
 */
public class PersistenceService {
    private static final PersistenceService INSTANCE = new PersistenceService();

    // localhost as it's expected to connect to DB via a sidecar: Cloud SQL Proxy
    private static final String URL="jdbc:mysql://localhost:3306/decl";
    
    private PersistenceService() {
        try {
            Class.forName("com.mysql.jdbc.Driver");
        } catch (ClassNotFoundException e) {
            System.err.println("JDBC driver not found");
            e.printStackTrace();
        }
    }
    public static PersistenceService getInstance() {
        return INSTANCE;
    }
    private Connection getConnection() throws SQLException {
        // Get DB credential via env, set by kubernetes secret
        String username = System.getenv("DB_USER");
        String password = System.getenv("DB_PASS");
        
        return DriverManager.getConnection(URL, username, password);
    }

    // Just a simple test for DB connection
    public String test() {
        Connection conn = null;
        try {
            conn = getConnection();
            return conn.getMetaData().getDatabaseProductName();
        } catch (Exception e) {
            System.err.println("Error in connecting to DB: "+e.getMessage());
            e.printStackTrace();
            return "Error: "+e.getMessage();
        } finally {
            closeConnection(conn);
        }
    }

    // Return all declarations in DB
    public Collection<Declaration> listAll() {
        Connection conn = null;
        ResultSet rs = null;
        List<Declaration> result = new LinkedList<Declaration>();
        try {
            conn = getConnection();
            PreparedStatement ps = conn.prepareStatement("select * from declaration");
            rs = ps.executeQuery();
            while (rs.next()) {
                String uuid = rs.getString("uuid");
                String username = rs.getString("username");
                int temperature_int = rs.getInt("temperature");
                float temperature = (float) temperature_int/10.0f;
                boolean hasSymptoms = rs.getInt("has_symptoms") == 1;
                boolean isCloseContact = rs.getInt("is_close") == 1;
                Timestamp submittted_ts = rs.getTimestamp("submitted_time");
                long submittedDate = submittted_ts.getTime();
                Declaration decl = new Declaration(username, temperature, hasSymptoms, isCloseContact, submittedDate);
                result.add(decl);
            }
            return result;
        } catch (Exception e) {
            System.err.println("Error in connecting to DB: "+e.getMessage());
            e.printStackTrace();
            throw new RuntimeException("Error in connecting to DB: "+e.getMessage(),e);
        } finally {
            closeResultSet(rs);
            closeConnection(conn);
        }
    }
    private String generateUUID() {
        byte[] b = new byte[8];
        try {
            SecureRandom.getInstance("SHA1PRNG").nextBytes(b);
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException("Unexpected, no SHA1PRNG?",e);
        }
        return Base64Url.encode(b);
    }

    // Save Declaration to DB
    public boolean save(Declaration decl) {
        Connection conn = null;
        try {
            conn = getConnection();
            PreparedStatement ps = conn.prepareStatement(
                "insert into declaration(uuid, username, temperature, has_symptoms, is_close, submitted_time) values (?, ?, ?, ?, ?, ?)"
            );
            String uuid = generateUUID(); // for DB primary key
            ps.setString(1, uuid);
            ps.setString(2, decl.getUsername());
            ps.setInt(3, Float.valueOf(decl.getTemperature()*10f).intValue()); // store in DB as int (37.5 ==> 375)
            ps.setInt(4, decl.hasSymptoms() ? 1 : 0);
            ps.setInt(5, decl.isCloseContact() ? 1 : 0);
            ps.setTimestamp(6, new Timestamp(decl.getSubmittedDate()));
            int count = ps.executeUpdate();
            return count > 0;
        } catch (Exception e) {
            System.err.println("Error in connecting to DB: "+e.getMessage());
            e.printStackTrace();
            throw new RuntimeException("Error in connecting to DB: "+e.getMessage(),e);
        } finally {
            closeConnection(conn);
        }
    }

    private void closeConnection(Connection conn) {
        try {
            if (conn != null)
                conn.close();
        } catch (SQLException e) {
            System.err.println("Exception when closing connection");
            e.printStackTrace();
        }
    }

    private void closeResultSet(ResultSet rs) {
        try {
            if (rs != null)
                rs.close();
        } catch (SQLException e) {
            System.err.println("Exception when closing connection");
            e.printStackTrace();
        }
    }


}
