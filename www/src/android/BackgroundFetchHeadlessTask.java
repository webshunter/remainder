package com.transistorsoft.cordova.backgroundfetch;
import android.content.Context;
import com.transistorsoft.tsbackgroundfetch.BackgroundFetch;
import com.transistorsoft.tsbackgroundfetch.BGTask;
import android.util.Log;

public class BackgroundFetchHeadlessTask implements HeadlessTask {
    @Override
    public void onFetch(Context context, BGTask task) {
        String taskId = task.getTaskId();
        boolean isTimeout = task.getTimedOut();
        if (isTimeout) {
          Log.d(BackgroundFetch.TAG, "My BackgroundFetchHeadlessTask TIMEOUT: " + taskId);
          BackgroundFetch.getInstance(context).finish(taskId);
          return;
        }
        Log.d(BackgroundFetch.TAG, "Yes Im Running");
        // Perform your work here....

        // Just as in Javascript callback, you must signal #finish
        BackgroundFetch.getInstance(context).finish(taskId);
    }
}