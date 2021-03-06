import { Action } from '@ngrx/store';

import { gameProgress, gameComplete } from './command-builders/game-p2p.command-builder';
import { RPCCommand } from '../../commands/rpc.command';
import { GAME_PROGRESS, COMPLETE_GAME } from '../../../shared/actions/game.actions';

const builders = new Map<string, CommandBuilder>();

export interface CommandBuilder {
  (payload: any, baseCommand: RPCCommand): RPCCommand;
}

export const registerCommandBuilder = (action: string, command: CommandBuilder) => {
  builders.set(action, command);
};

export const buildP2PCommand = (action: Action) => {
  const type = action.type;
  if (builders.has(type)) {
    return builders.get(type)
      .bind(null, action.payload);
  }
  return null;
};

registerCommandBuilder(GAME_PROGRESS, gameProgress);
registerCommandBuilder(COMPLETE_GAME, gameComplete);
