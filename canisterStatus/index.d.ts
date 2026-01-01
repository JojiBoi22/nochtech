import { Principal } from '@dfinity/principal';
import { HttpAgent } from '../agent/http/index.ts';
import { type DerEncodedPublicKey } from '../auth.ts';
/**
 * Represents the useful information about a subnet
 * @param {string} subnetId the principal id of the canister's subnet
 * @param {string[]} nodeKeys the keys of the individual nodes in the subnet
 */
export type SubnetStatus = {
    subnetId: string;
    nodeKeys: Map<string, DerEncodedPublicKey>;
    metrics?: {
        num_canisters: bigint;
        canister_state_bytes: bigint;
        consumed_cycles_total: {
            current: bigint;
            deleted: bigint;
        };
        update_transactions_total: bigint;
    };
};
/**
 * Types of an entry on the canisterStatus map.
 * An entry of null indicates that the request failed, due to lack of permissions or the result being missing.
 */
export type Status = string | Uint8Array | Date | Uint8Array[] | Principal[] | SubnetStatus | bigint | null;
/**
 * Interface to define a custom path. Nested paths will be represented as individual buffers, and can be created from text using TextEncoder.
 * @param {string} key the key to use to access the returned value in the canisterStatus map
 * @param {Uint8Array[]} path the path to the desired value, represented as an array of buffers
 * @param {string} decodeStrategy the strategy to use to decode the returned value
 */
export declare class CustomPath implements CustomPath {
    key: string;
    path: Uint8Array[] | string;
    decodeStrategy: 'cbor' | 'hex' | 'leb128' | 'utf-8' | 'raw';
    constructor(key: string, path: Uint8Array[] | string, decodeStrategy: 'cbor' | 'hex' | 'leb128' | 'utf-8' | 'raw');
}
/**
 * @deprecated Use {@link CustomPath} instead
 * @param {string} key the key to use to access the returned value in the canisterStatus map
 * @param {string} path the path to the desired value, represented as a string
 * @param {string} decodeStrategy the strategy to use to decode the returned value
 */
export interface MetaData {
    kind: 'metadata';
    key: string;
    path: string | Uint8Array;
    decodeStrategy: 'cbor' | 'hex' | 'leb128' | 'utf-8' | 'raw';
}
/**
 * Pre-configured fields for canister status paths
 */
export type Path = 'time' | 'controllers' | 'subnet' | 'module_hash' | 'candid' | MetaData | CustomPath;
export type StatusMap = Map<Path | string, Status>;
export type CanisterStatusOptions = {
    /**
     * The effective canister ID to use in the underlying {@link HttpAgent.readState} call.
     */
    canisterId: Principal;
    /**
     * The agent to use to make the canister request. Must be authenticated.
     */
    agent: HttpAgent;
    /**
     * The paths to request.
     * @default []
     */
    paths?: Path[] | Set<Path>;
    /**
     * Whether to disable the certificate freshness checks.
     * @default false
     */
    disableCertificateTimeVerification?: boolean;
};
/**
 * Requests information from a canister's `read_state` endpoint.
 * Can be used to request information about the canister's controllers, time, module hash, candid interface, and more.
 * @param {CanisterStatusOptions} options The configuration for the canister status request.
 * @see {@link CanisterStatusOptions} for detailed options.
 * @returns {Promise<StatusMap>} A map populated with data from the requested paths. Each path is a key in the map, and the value is the data obtained from the certificate for that path.
 * @example
 * const status = await canisterStatus({
 *   paths: ['controllers', 'candid'],
 *   ...options
 * });
 *
 * const controllers = status.get('controllers');
 */
export declare const request: (options: CanisterStatusOptions) => Promise<StatusMap>;
export declare const fetchNodeKeys: (certificate: Uint8Array, canisterId: Principal, root_key?: Uint8Array) => SubnetStatus;
export declare const encodePath: (path: Path, canisterId: Principal) => Uint8Array[];
//# sourceMappingURL=index.d.ts.map