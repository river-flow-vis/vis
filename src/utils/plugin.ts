import leaflet from "leaflet";

type GwfVisPluginFull = GwfVisPlugin &
  GwfVisPluginWithSharedStates &
  GwfVisMapPlugin;

export type GwfVisPluginProps = Partial<GwfVisPluginFull> & Record<string, any>;

export type SharedStates = Record<string, any>;

export type LayerType = "base-layer" | "overlay";

export interface GwfVisPlugin extends HTMLElement {
  /**
   * Obtain the plugin's header to be displayed.
   * @returns A string of the header.
   */
  readonly obtainHeader: () => string;

  /**
   * A callback passed from the plugin host. Call it to notify the plugin host about a loading is going to start.
   * The plugin host would show a loading prompt if there is any unfinished loading request of any plugin.
   * @returns A callback that notifies the plugin host that the current loading request has finished.
   */
  notifyLoadingCallback: () => () => void;
}

export interface GwfVisPluginWithSharedStates extends GwfVisPlugin {
  /**
   * A key-value based shared state dictionary.
   */
  sharedStates: SharedStates;

  /**
   * A callback passed from the plugin host. Call it to update the `sharedStates`.
   * @param sharedStates - The new `sharedStates` dictionary. It should not be the same object reference of the original one.
   */
  updateSharedStatesCallback: (sharedStates: SharedStates) => void;
}

export interface GwfVisMapPlugin extends GwfVisPlugin {
  /**
   * The `leaflet` instance.
   */
  leaflet: typeof leaflet;

  /**
   * The map instance.
   */
  mapInstance: leaflet.Map;

  /**
   * A callback passed from the plugin host. Call it to add a layer into the map instance.
   * It will also add the layer into the layer control.
   */
  addMapLayerCallback: (
    layer: leaflet.Layer,
    name: string,
    type: LayerType,
    active?: boolean
  ) => void;

  /**
   * A callback passed from the plugin host. Call it to remove a layer from the map instance.
   * It will also remove the layer from the layer control.
   */
  removeMapLayerCallback: (layer: leaflet.Layer) => void;
}

export interface GwfVisDataPlugin extends GwfVisPlugin {
  /**
   * Query the data for a data source.
   * @param dataSource - A string that identifies the data source.
   * @param query - A query object.
   * @returns The data queried.
   */
  query: (dataSource: string, query: any) => any;

  /**
   * A callback passed from the plugin host. Call it to register this plugin as a data provider.
   * @param identifier - A string identifier for determining if the data source is related to this provider.
   * @param pluginInstance - The plugin instance.
   */
  registerDataProviderCallback: (
    identifier: string,
    pluginInstance: GwfVisDataPlugin
  ) => void;
}