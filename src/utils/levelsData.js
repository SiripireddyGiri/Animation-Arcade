let levelsCache = [];

export const loadLevels = async () => {
  if (levelsCache && levelsCache.length > 0) {
    console.log("📦 levelsData: Returning cached levels");
    return levelsCache;
  }

  try {
    console.log("📡 levelsData: Fetching from /levelsdata.json...");
    const response = await fetch(`/levelsdata.json?v=${Date.now()}`);

    console.log("📡 levelsData: Response status:", response.status);
    if (!response.ok) {
      const errorText = await response.text();
      console.error("❌ levelsData: Fetch failed!", {
        status: response.status,
        statusText: response.statusText,
        body: errorText,
      });
      throw new Error(
        `Failed to load levels data: ${response.status} ${response.statusText}`,
      );
    }

    const data = await response.json();
    console.log(
      "📥 levelsData: Parse successful. Data type:",
      typeof data,
      "IsArray:",
      Array.isArray(data),
    );

    let levels = [];
    if (Array.isArray(data)) {
      levels = data;
    } else if (data && typeof data === "object" && Array.isArray(data.levels)) {
      levels = data.levels;
    } else {
      console.error("❌ levelsData: Invalid data format received:", data);
      throw new Error(
        'Invalid levels data format: expected an array or an object with a "levels" array',
      );
    }

    console.log("✅ levelsData: Successfully loaded", levels.length, "levels");
    levelsCache = levels;
    return levelsCache;
  } catch (error) {
    console.error("❌ levelsData: Fatal error during loading:", error);
    throw error;
  }
};

export const getLevels = () => {
  return levelsCache || [];
};
