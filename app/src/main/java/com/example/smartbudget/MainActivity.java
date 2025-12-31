package com.example.smartbudget;
import android.os.Bundle;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import androidx.appcompat.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity {

    private WebView myWebView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        // Link the Java object to the XML WebView ID
        myWebView = findViewById(R.id.webview);

        WebSettings webSettings = myWebView.getSettings();

        // 1. Enable JavaScript (Required for Chart.js and your logic)
        webSettings.setJavaScriptEnabled(true);

        // 2. Enable LocalStorage (This replaces your browser's local storage)
        webSettings.setDomStorageEnabled(true);
        webSettings.setDatabaseEnabled(true);

        // 3. Allow the WebView to load files from the assets folder
        webSettings.setAllowFileAccess(true);
        webSettings.setAllowContentAccess(true);

        // 4. Force links and redirects to open inside the app
        myWebView.setWebViewClient(new WebViewClient());

        // 5. Load your index.html file from the assets folder
        myWebView.loadUrl("file:///android_asset/index.html");
    }

    // This ensures that pressing the 'Back' button on the phone
    // goes back in the web history instead of closing the app immediately.
    @Override
    public void onBackPressed() {
        if (myWebView.canGoBack()) {
            myWebView.goBack();
        } else {
            super.onBackPressed();
        }
    }
}