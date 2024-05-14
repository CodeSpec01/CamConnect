import { CancelCallButton, ReactionsButton, RecordCallButton, ScreenShareButton, ToggleAudioPublishingButton, ToggleVideoPublishingButton } from "@stream-io/video-react-sdk";

export type CallControlsProps = {
    onLeave?: () => void;
};

export const CallControls = ({ onLeave }: CallControlsProps) => (
    <div className="str-video__call-controls">
        <RecordCallButton />
        <ReactionsButton />
        <ScreenShareButton />
        <ToggleAudioPublishingButton />
        <ToggleVideoPublishingButton />
        <CancelCallButton onLeave={onLeave} />
    </div>
);