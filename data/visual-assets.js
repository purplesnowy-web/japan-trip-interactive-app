/* V5 visual asset overlay. Keep photo provenance here when replacing generated art. */
(function () {
  const updates = window.TRIP_UPDATES || {};
  window.TRIP_VISUAL_ASSETS = {
    ...(updates.visualAssets || {}),
  };
})();
