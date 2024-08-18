import {
  CycleRegularity,
  FertilityAwarenessMethod,
  Purpose,
} from '../enums/user-profile.enums';

export class UserProfileDto {
  id: number;
  name: string;
  age: number | null;
  purpose: Purpose | null;
  fertilityAwarenessMethod: FertilityAwarenessMethod | null;
  cycleRegularity: CycleRegularity | null;
  cycleDuration: number | null;
  menstruationDuration: number | null;
  lastMenstruationDate: Date | null;
  illnesses: string | null;
  weight: number | null;
  height: number | null;
}
