/**
 * 히어로 로봇 캐릭터의 Canvas 준비 상태를 전달하는 콜백 스토어.
 * SpaceAstronaut이 Canvas onCreated에서 signalAstronautReady를 호출하면,
 * HomeClient에 등록된 리스너가 인트로 로더의 씬 준비 상태를 갱신한다.
 */

type Listener = () => void

let _listener: Listener | null = null

/** HomeClient가 호출: 로봇 준비 콜백 등록 */
export function setAstronautReadyListener(cb: Listener) {
  _listener = cb
}

/** HomeClient 언마운트 시 호출: 콜백 해제 */
export function clearAstronautReadyListener() {
  _listener = null
}

/** SpaceAstronaut Canvas onCreated에서 호출: 준비 완료 알림 */
export function signalAstronautReady() {
  _listener?.()
}
