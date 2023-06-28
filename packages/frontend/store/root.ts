import { defineStore } from 'pinia';
import { SettingsI, ServerI } from '../interfaces/interfaces';
import { RoomI } from '../../interfaces/src/main';

const STORE_NAME = 'root';

const defaultServers: ServerI[] = [
  {
    name: 'Discreetly',
    serverInfoEndpoint: 'localhost:3001',
    messageHandlerSocket: 'localhost:3002',
    serverData: { rooms: [], selectedRoom: 0n }
  }
];

const getDefaultSettings = (): SettingsI => ({
  selectedServer: 0,
  servers: defaultServers
});

const getSettings = () => {
  let settings = null;
  try {
    settings = localStorage.getItem(STORE_NAME);
  } catch (error) {
    console.info(error);
  }
  return settings ? JSON.parse(settings) : getDefaultSettings();
};

export const useRootStore = defineStore(STORE_NAME, {
  state: () => ({
    settings: getSettings()
  }),
  getters: {
    getServers(state) {
      return state.settings.servers;
    },
    getSelectedServer(state): ServerI {
      if (state.settings.servers) {
        return state.settings.servers[state.settings.selectedServer];
      }
      return defaultServers[0];
    },
    getRooms(state): RoomI[] {
      return this.getSelectedServer.serverData.rooms;
    },
    getSelectedRoom(state): RoomI {
      const selectedRoom =
        state.settings.servers[state.settings.selectedServer].serverData.selectedRoom;
      if (selectedRoom) {
        return selectedRoom;
      } else {
        return state.settings.servers[state.settings.selectedServer].serverData.rooms[0];
      }
    }
  },
  actions: {
    setSelectedRoom(room: RoomI['id']) {
      this.settings.servers[this.settings.selectedServer].serverData.selectedRoom = room;
    },
    updateSettings(partialSettings: SettingsI) {
      this.settings = {
        ...this.settings,
        ...partialSettings
      };
      localStorage.setItem('settings', JSON.stringify(this.settings));
    },
    async fetchServers() {
      this.settings.servers.forEach(async (server: ServerI, index: number) => {
        const endpoint = 'http://' + server.serverInfoEndpoint + '/';
        try {
          const data = await useFetch(endpoint);
          this.settings.servers[index].serverData = data.data;
        } catch (error) {
          console.log(error);
        }
      });
    },
    async fetchRooms(): Promise<RoomI[]> {
      const server = this.getSelectedServer;
      const endpoint = 'http://' + server.serverInfoEndpoint + '/rooms';
      const response = await useFetch(endpoint);

      const data: RoomI[] = await response.json();
      server.serverData.rooms = data as RoomI[];
      return server.serverData.rooms;
    }
  }
});
