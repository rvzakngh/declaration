package test.declaration;

import org.json.JSONArray;
import org.json.JSONObject;
import org.junit.Test;
import org.junit.experimental.categories.Category;

import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.net.URLConnection;
import java.util.Scanner;

import static org.junit.Assert.assertTrue;

@Category(Integration.class)
public class DeclarationRestTest {
    @Test
    public void listAll_returnsNonZeroResult() throws IOException {
        String url = "http://localhost:8999/api/declaration/list-all";
        URLConnection connection = new URL(url).openConnection();
        try (InputStream response = connection.getInputStream();
            Scanner scanner = new Scanner(response)) {
            String responseBody = scanner.nextLine();
            JSONArray json = new JSONArray(responseBody);
            assertTrue("More than one result", json.length() > 0);
        }
    }
}

