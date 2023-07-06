import { defineStore } from 'pinia';
import { MembershipI, RoomGroupI, RoomI, ServerI } from '../../protocol-interfaces/src/main';
import { createGlobalState, useFetch, useStorage } from '@vueuse/core';
import { SettingsI } from '../interfaces/interfaces';

const SETTINGS_STORE_NAME = 'settings';

const defaultServers: ServerI[] = [
  {
    name: 'Discreetly',
    serverInfoEndpoint: 'localhost:3001',
    messageHandlerSocket: 'localhost:3002',
    roomGroups: [
      {
        name: 'client_defaults',
        rooms: [
          {
            id: 0n,
            name: 'Loading...',
            membership: [0n, 1n, 2n] as MembershipI
          }
        ]
      }
    ]
  }
];

// TODO: Need to write a settings class
const getDefaultSettings = (): SettingsI => ({
  selectedServer: 0,
  servers: defaultServers,
  selectedRoom: 0n
});

export const useSettingsState = createGlobalState(() => {
  return useStorage(SETTINGS_STORE_NAME, {
    settings: getDefaultSettings()
  });
});

export function getServers() {
  return useSettingsState().value.settings.servers;
}

export function getSelectedServer(): ServerI {
  const settings = useSettingsState().value.settings;
  if (settings.servers) {
    return settings.servers[settings.selectedServer];
  }
  return defaultServers[0];
}

export function getRooms(): RoomGroupI[] | undefined {
  const settings = useSettingsState().value.settings;
  return settings.servers[settings.selectedServer].roomGroups;
}

export function getSelectedRoom(): RoomI {
  const settings = useSettingsState().value.settings;
  console.log(settings);
  const selectedRoom = settings.selectedRoom;
  if (selectedRoom) {
    settings.servers[settings.selectedServer].roomGroups.forEach((RoomGroup) => {
      RoomGroup.rooms.forEach((room) => {
        if (room.id === selectedRoom) {
          return room;
        }
      });
    });
  }
  return settings.servers[settings.selectedServer].roomGroups[0].rooms[0];
}

export function setSelectedRoom(room: RoomI['id']) {
  const settings = useSettingsState().value.settings;
  settings.selectedRoom = room;
}

export async function fetchRooms(): Promise<RoomGroupI[]> {
  const settings = useSettingsState().value.settings;
  const server = settings.servers[settings.selectedServer];
  const endpoint = 'http://' + server.serverInfoEndpoint + '/rooms';
  const response = await useFetch(endpoint);
  const data: RoomGroupI[] = (await response.data.value) as RoomGroupI[];
  server.roomGroups = data as RoomGroupI[];
  return server.roomGroups;
}

export async function fetchServers(): Promise<void> {
  const servers = useSettingsState().value.settings.servers;
  servers.forEach(async (server: ServerI, index: number) => {
    const endpoint = 'http://' + server.serverInfoEndpoint + '/';
    try {
      const response = await useFetch(endpoint);
      servers[index] = response.data.value as ServerI;
    } catch (error) {
      console.error(error);
    }
  });
}
