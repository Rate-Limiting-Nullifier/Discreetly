import { defineStore } from 'pinia';
import { SettingsI, ServerI } from '../interfaces/interfaces';
import { RoomI } from '../../protocol-interfaces/src/main';
import { createGlobalState, useStorage } from '@vueuse/core';

const STORE_NAME = 'root';

const defaultServers: ServerI[] = [
  {
    name: 'Discreetly',
    serverInfoEndpoint: 'localhost:3001',
    messageHandlerSocket: 'localhost:3002',
    serverData: { rooms: [], selectedRoom: 0n }
  }
];

// TODO: Need to write a settings class
const getDefaultSettings = (): SettingsI => ({
  selectedServer: 0,
  servers: defaultServers
});

export const useGlobalState = createGlobalState(() => {
  return useStorage(STORE_NAME, {
    settings: getDefaultSettings()
  });
});

export function getServers() {
  return useGlobalState().value.settings.servers;
}

export function getSelectedServer(): ServerI {
  const settings = useGlobalState().value.settings;
  if (settings.servers) {
    return settings.servers[settings.selectedServer];
  }
  return defaultServers[0];
}

export function getRooms(): RoomI[] {
  const settings = useGlobalState().value.settings;
  return settings.servers[settings.selectedServer].serverData.rooms;
}

export function getSelectedRoom(): RoomI {
  const settings = useGlobalState().value.settings;
  const selectedRoom = settings.servers[settings.selectedServer].serverData.selectedRoom;
  if (selectedRoom) {
    return settings.servers[settings.selectedServer].serverData.rooms.find(
      (element) => element.id === selectedRoom
    ) as RoomI;
  } else {
    return settings.servers[settings.selectedServer].serverData.rooms[0];
  }
}

export function setSelectedRoom(room: RoomI['id']) {
  const settings = useGlobalState().value.settings;
  settings.servers[settings.selectedServer].serverData.selectedRoom = room;
}

export async function fetchRooms(): Promise<RoomI[]> {
  const settings = useGlobalState().value.settings;
  const server = settings.servers[settings.selectedServer];
  const endpoint = 'http://' + server.serverInfoEndpoint + '/rooms';
  const response = await useFetch(endpoint);
  console.log(response);
  const data: RoomI[] = (await response.data.value) as RoomI[];
  server.serverData.rooms = data as RoomI[];
  return server.serverData.rooms;
}

export async function fetchServers(): Promise<ServerI[]> {
  const servers = useGlobalState().value.settings.servers;
  servers.forEach(async (server: ServerI, index: number) => {
    const endpoint = 'http://' + server.serverInfoEndpoint + '/';
    try {
      const response = await useFetch(endpoint);
      console.log(response);
      servers[index].serverData = response.data.value as ServerI['serverData'];
    } catch (error) {
      console.log(error);
    }
  });
  return servers;
}
