import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type RolePermissionModel = runtime.Types.Result.DefaultSelection<Prisma.$RolePermissionPayload>;
export type AggregateRolePermission = {
    _count: RolePermissionCountAggregateOutputType | null;
    _avg: RolePermissionAvgAggregateOutputType | null;
    _sum: RolePermissionSumAggregateOutputType | null;
    _min: RolePermissionMinAggregateOutputType | null;
    _max: RolePermissionMaxAggregateOutputType | null;
};
export type RolePermissionAvgAggregateOutputType = {
    roleId: number | null;
    permissionId: number | null;
};
export type RolePermissionSumAggregateOutputType = {
    roleId: number | null;
    permissionId: number | null;
};
export type RolePermissionMinAggregateOutputType = {
    roleId: number | null;
    permissionId: number | null;
};
export type RolePermissionMaxAggregateOutputType = {
    roleId: number | null;
    permissionId: number | null;
};
export type RolePermissionCountAggregateOutputType = {
    roleId: number;
    permissionId: number;
    _all: number;
};
export type RolePermissionAvgAggregateInputType = {
    roleId?: true;
    permissionId?: true;
};
export type RolePermissionSumAggregateInputType = {
    roleId?: true;
    permissionId?: true;
};
export type RolePermissionMinAggregateInputType = {
    roleId?: true;
    permissionId?: true;
};
export type RolePermissionMaxAggregateInputType = {
    roleId?: true;
    permissionId?: true;
};
export type RolePermissionCountAggregateInputType = {
    roleId?: true;
    permissionId?: true;
    _all?: true;
};
export type RolePermissionAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.RolePermissionWhereInput;
    orderBy?: Prisma.RolePermissionOrderByWithRelationInput | Prisma.RolePermissionOrderByWithRelationInput[];
    cursor?: Prisma.RolePermissionWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | RolePermissionCountAggregateInputType;
    _avg?: RolePermissionAvgAggregateInputType;
    _sum?: RolePermissionSumAggregateInputType;
    _min?: RolePermissionMinAggregateInputType;
    _max?: RolePermissionMaxAggregateInputType;
};
export type GetRolePermissionAggregateType<T extends RolePermissionAggregateArgs> = {
    [P in keyof T & keyof AggregateRolePermission]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateRolePermission[P]> : Prisma.GetScalarType<T[P], AggregateRolePermission[P]>;
};
export type RolePermissionGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.RolePermissionWhereInput;
    orderBy?: Prisma.RolePermissionOrderByWithAggregationInput | Prisma.RolePermissionOrderByWithAggregationInput[];
    by: Prisma.RolePermissionScalarFieldEnum[] | Prisma.RolePermissionScalarFieldEnum;
    having?: Prisma.RolePermissionScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: RolePermissionCountAggregateInputType | true;
    _avg?: RolePermissionAvgAggregateInputType;
    _sum?: RolePermissionSumAggregateInputType;
    _min?: RolePermissionMinAggregateInputType;
    _max?: RolePermissionMaxAggregateInputType;
};
export type RolePermissionGroupByOutputType = {
    roleId: number;
    permissionId: number;
    _count: RolePermissionCountAggregateOutputType | null;
    _avg: RolePermissionAvgAggregateOutputType | null;
    _sum: RolePermissionSumAggregateOutputType | null;
    _min: RolePermissionMinAggregateOutputType | null;
    _max: RolePermissionMaxAggregateOutputType | null;
};
export type GetRolePermissionGroupByPayload<T extends RolePermissionGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<RolePermissionGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof RolePermissionGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], RolePermissionGroupByOutputType[P]> : Prisma.GetScalarType<T[P], RolePermissionGroupByOutputType[P]>;
}>>;
export type RolePermissionWhereInput = {
    AND?: Prisma.RolePermissionWhereInput | Prisma.RolePermissionWhereInput[];
    OR?: Prisma.RolePermissionWhereInput[];
    NOT?: Prisma.RolePermissionWhereInput | Prisma.RolePermissionWhereInput[];
    roleId?: Prisma.IntFilter<"RolePermission"> | number;
    permissionId?: Prisma.IntFilter<"RolePermission"> | number;
    role?: Prisma.XOR<Prisma.RoleScalarRelationFilter, Prisma.RoleWhereInput>;
    permission?: Prisma.XOR<Prisma.PermissionScalarRelationFilter, Prisma.PermissionWhereInput>;
};
export type RolePermissionOrderByWithRelationInput = {
    roleId?: Prisma.SortOrder;
    permissionId?: Prisma.SortOrder;
    role?: Prisma.RoleOrderByWithRelationInput;
    permission?: Prisma.PermissionOrderByWithRelationInput;
};
export type RolePermissionWhereUniqueInput = Prisma.AtLeast<{
    roleId_permissionId?: Prisma.RolePermissionRoleIdPermissionIdCompoundUniqueInput;
    AND?: Prisma.RolePermissionWhereInput | Prisma.RolePermissionWhereInput[];
    OR?: Prisma.RolePermissionWhereInput[];
    NOT?: Prisma.RolePermissionWhereInput | Prisma.RolePermissionWhereInput[];
    roleId?: Prisma.IntFilter<"RolePermission"> | number;
    permissionId?: Prisma.IntFilter<"RolePermission"> | number;
    role?: Prisma.XOR<Prisma.RoleScalarRelationFilter, Prisma.RoleWhereInput>;
    permission?: Prisma.XOR<Prisma.PermissionScalarRelationFilter, Prisma.PermissionWhereInput>;
}, "roleId_permissionId">;
export type RolePermissionOrderByWithAggregationInput = {
    roleId?: Prisma.SortOrder;
    permissionId?: Prisma.SortOrder;
    _count?: Prisma.RolePermissionCountOrderByAggregateInput;
    _avg?: Prisma.RolePermissionAvgOrderByAggregateInput;
    _max?: Prisma.RolePermissionMaxOrderByAggregateInput;
    _min?: Prisma.RolePermissionMinOrderByAggregateInput;
    _sum?: Prisma.RolePermissionSumOrderByAggregateInput;
};
export type RolePermissionScalarWhereWithAggregatesInput = {
    AND?: Prisma.RolePermissionScalarWhereWithAggregatesInput | Prisma.RolePermissionScalarWhereWithAggregatesInput[];
    OR?: Prisma.RolePermissionScalarWhereWithAggregatesInput[];
    NOT?: Prisma.RolePermissionScalarWhereWithAggregatesInput | Prisma.RolePermissionScalarWhereWithAggregatesInput[];
    roleId?: Prisma.IntWithAggregatesFilter<"RolePermission"> | number;
    permissionId?: Prisma.IntWithAggregatesFilter<"RolePermission"> | number;
};
export type RolePermissionCreateInput = {
    role: Prisma.RoleCreateNestedOneWithoutPermissionsInput;
    permission: Prisma.PermissionCreateNestedOneWithoutRolesInput;
};
export type RolePermissionUncheckedCreateInput = {
    roleId: number;
    permissionId: number;
};
export type RolePermissionUpdateInput = {
    role?: Prisma.RoleUpdateOneRequiredWithoutPermissionsNestedInput;
    permission?: Prisma.PermissionUpdateOneRequiredWithoutRolesNestedInput;
};
export type RolePermissionUncheckedUpdateInput = {
    roleId?: Prisma.IntFieldUpdateOperationsInput | number;
    permissionId?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type RolePermissionCreateManyInput = {
    roleId: number;
    permissionId: number;
};
export type RolePermissionUpdateManyMutationInput = {};
export type RolePermissionUncheckedUpdateManyInput = {
    roleId?: Prisma.IntFieldUpdateOperationsInput | number;
    permissionId?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type RolePermissionListRelationFilter = {
    every?: Prisma.RolePermissionWhereInput;
    some?: Prisma.RolePermissionWhereInput;
    none?: Prisma.RolePermissionWhereInput;
};
export type RolePermissionOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type RolePermissionRoleIdPermissionIdCompoundUniqueInput = {
    roleId: number;
    permissionId: number;
};
export type RolePermissionCountOrderByAggregateInput = {
    roleId?: Prisma.SortOrder;
    permissionId?: Prisma.SortOrder;
};
export type RolePermissionAvgOrderByAggregateInput = {
    roleId?: Prisma.SortOrder;
    permissionId?: Prisma.SortOrder;
};
export type RolePermissionMaxOrderByAggregateInput = {
    roleId?: Prisma.SortOrder;
    permissionId?: Prisma.SortOrder;
};
export type RolePermissionMinOrderByAggregateInput = {
    roleId?: Prisma.SortOrder;
    permissionId?: Prisma.SortOrder;
};
export type RolePermissionSumOrderByAggregateInput = {
    roleId?: Prisma.SortOrder;
    permissionId?: Prisma.SortOrder;
};
export type RolePermissionCreateNestedManyWithoutRoleInput = {
    create?: Prisma.XOR<Prisma.RolePermissionCreateWithoutRoleInput, Prisma.RolePermissionUncheckedCreateWithoutRoleInput> | Prisma.RolePermissionCreateWithoutRoleInput[] | Prisma.RolePermissionUncheckedCreateWithoutRoleInput[];
    connectOrCreate?: Prisma.RolePermissionCreateOrConnectWithoutRoleInput | Prisma.RolePermissionCreateOrConnectWithoutRoleInput[];
    createMany?: Prisma.RolePermissionCreateManyRoleInputEnvelope;
    connect?: Prisma.RolePermissionWhereUniqueInput | Prisma.RolePermissionWhereUniqueInput[];
};
export type RolePermissionUncheckedCreateNestedManyWithoutRoleInput = {
    create?: Prisma.XOR<Prisma.RolePermissionCreateWithoutRoleInput, Prisma.RolePermissionUncheckedCreateWithoutRoleInput> | Prisma.RolePermissionCreateWithoutRoleInput[] | Prisma.RolePermissionUncheckedCreateWithoutRoleInput[];
    connectOrCreate?: Prisma.RolePermissionCreateOrConnectWithoutRoleInput | Prisma.RolePermissionCreateOrConnectWithoutRoleInput[];
    createMany?: Prisma.RolePermissionCreateManyRoleInputEnvelope;
    connect?: Prisma.RolePermissionWhereUniqueInput | Prisma.RolePermissionWhereUniqueInput[];
};
export type RolePermissionUpdateManyWithoutRoleNestedInput = {
    create?: Prisma.XOR<Prisma.RolePermissionCreateWithoutRoleInput, Prisma.RolePermissionUncheckedCreateWithoutRoleInput> | Prisma.RolePermissionCreateWithoutRoleInput[] | Prisma.RolePermissionUncheckedCreateWithoutRoleInput[];
    connectOrCreate?: Prisma.RolePermissionCreateOrConnectWithoutRoleInput | Prisma.RolePermissionCreateOrConnectWithoutRoleInput[];
    upsert?: Prisma.RolePermissionUpsertWithWhereUniqueWithoutRoleInput | Prisma.RolePermissionUpsertWithWhereUniqueWithoutRoleInput[];
    createMany?: Prisma.RolePermissionCreateManyRoleInputEnvelope;
    set?: Prisma.RolePermissionWhereUniqueInput | Prisma.RolePermissionWhereUniqueInput[];
    disconnect?: Prisma.RolePermissionWhereUniqueInput | Prisma.RolePermissionWhereUniqueInput[];
    delete?: Prisma.RolePermissionWhereUniqueInput | Prisma.RolePermissionWhereUniqueInput[];
    connect?: Prisma.RolePermissionWhereUniqueInput | Prisma.RolePermissionWhereUniqueInput[];
    update?: Prisma.RolePermissionUpdateWithWhereUniqueWithoutRoleInput | Prisma.RolePermissionUpdateWithWhereUniqueWithoutRoleInput[];
    updateMany?: Prisma.RolePermissionUpdateManyWithWhereWithoutRoleInput | Prisma.RolePermissionUpdateManyWithWhereWithoutRoleInput[];
    deleteMany?: Prisma.RolePermissionScalarWhereInput | Prisma.RolePermissionScalarWhereInput[];
};
export type RolePermissionUncheckedUpdateManyWithoutRoleNestedInput = {
    create?: Prisma.XOR<Prisma.RolePermissionCreateWithoutRoleInput, Prisma.RolePermissionUncheckedCreateWithoutRoleInput> | Prisma.RolePermissionCreateWithoutRoleInput[] | Prisma.RolePermissionUncheckedCreateWithoutRoleInput[];
    connectOrCreate?: Prisma.RolePermissionCreateOrConnectWithoutRoleInput | Prisma.RolePermissionCreateOrConnectWithoutRoleInput[];
    upsert?: Prisma.RolePermissionUpsertWithWhereUniqueWithoutRoleInput | Prisma.RolePermissionUpsertWithWhereUniqueWithoutRoleInput[];
    createMany?: Prisma.RolePermissionCreateManyRoleInputEnvelope;
    set?: Prisma.RolePermissionWhereUniqueInput | Prisma.RolePermissionWhereUniqueInput[];
    disconnect?: Prisma.RolePermissionWhereUniqueInput | Prisma.RolePermissionWhereUniqueInput[];
    delete?: Prisma.RolePermissionWhereUniqueInput | Prisma.RolePermissionWhereUniqueInput[];
    connect?: Prisma.RolePermissionWhereUniqueInput | Prisma.RolePermissionWhereUniqueInput[];
    update?: Prisma.RolePermissionUpdateWithWhereUniqueWithoutRoleInput | Prisma.RolePermissionUpdateWithWhereUniqueWithoutRoleInput[];
    updateMany?: Prisma.RolePermissionUpdateManyWithWhereWithoutRoleInput | Prisma.RolePermissionUpdateManyWithWhereWithoutRoleInput[];
    deleteMany?: Prisma.RolePermissionScalarWhereInput | Prisma.RolePermissionScalarWhereInput[];
};
export type RolePermissionCreateNestedManyWithoutPermissionInput = {
    create?: Prisma.XOR<Prisma.RolePermissionCreateWithoutPermissionInput, Prisma.RolePermissionUncheckedCreateWithoutPermissionInput> | Prisma.RolePermissionCreateWithoutPermissionInput[] | Prisma.RolePermissionUncheckedCreateWithoutPermissionInput[];
    connectOrCreate?: Prisma.RolePermissionCreateOrConnectWithoutPermissionInput | Prisma.RolePermissionCreateOrConnectWithoutPermissionInput[];
    createMany?: Prisma.RolePermissionCreateManyPermissionInputEnvelope;
    connect?: Prisma.RolePermissionWhereUniqueInput | Prisma.RolePermissionWhereUniqueInput[];
};
export type RolePermissionUncheckedCreateNestedManyWithoutPermissionInput = {
    create?: Prisma.XOR<Prisma.RolePermissionCreateWithoutPermissionInput, Prisma.RolePermissionUncheckedCreateWithoutPermissionInput> | Prisma.RolePermissionCreateWithoutPermissionInput[] | Prisma.RolePermissionUncheckedCreateWithoutPermissionInput[];
    connectOrCreate?: Prisma.RolePermissionCreateOrConnectWithoutPermissionInput | Prisma.RolePermissionCreateOrConnectWithoutPermissionInput[];
    createMany?: Prisma.RolePermissionCreateManyPermissionInputEnvelope;
    connect?: Prisma.RolePermissionWhereUniqueInput | Prisma.RolePermissionWhereUniqueInput[];
};
export type RolePermissionUpdateManyWithoutPermissionNestedInput = {
    create?: Prisma.XOR<Prisma.RolePermissionCreateWithoutPermissionInput, Prisma.RolePermissionUncheckedCreateWithoutPermissionInput> | Prisma.RolePermissionCreateWithoutPermissionInput[] | Prisma.RolePermissionUncheckedCreateWithoutPermissionInput[];
    connectOrCreate?: Prisma.RolePermissionCreateOrConnectWithoutPermissionInput | Prisma.RolePermissionCreateOrConnectWithoutPermissionInput[];
    upsert?: Prisma.RolePermissionUpsertWithWhereUniqueWithoutPermissionInput | Prisma.RolePermissionUpsertWithWhereUniqueWithoutPermissionInput[];
    createMany?: Prisma.RolePermissionCreateManyPermissionInputEnvelope;
    set?: Prisma.RolePermissionWhereUniqueInput | Prisma.RolePermissionWhereUniqueInput[];
    disconnect?: Prisma.RolePermissionWhereUniqueInput | Prisma.RolePermissionWhereUniqueInput[];
    delete?: Prisma.RolePermissionWhereUniqueInput | Prisma.RolePermissionWhereUniqueInput[];
    connect?: Prisma.RolePermissionWhereUniqueInput | Prisma.RolePermissionWhereUniqueInput[];
    update?: Prisma.RolePermissionUpdateWithWhereUniqueWithoutPermissionInput | Prisma.RolePermissionUpdateWithWhereUniqueWithoutPermissionInput[];
    updateMany?: Prisma.RolePermissionUpdateManyWithWhereWithoutPermissionInput | Prisma.RolePermissionUpdateManyWithWhereWithoutPermissionInput[];
    deleteMany?: Prisma.RolePermissionScalarWhereInput | Prisma.RolePermissionScalarWhereInput[];
};
export type RolePermissionUncheckedUpdateManyWithoutPermissionNestedInput = {
    create?: Prisma.XOR<Prisma.RolePermissionCreateWithoutPermissionInput, Prisma.RolePermissionUncheckedCreateWithoutPermissionInput> | Prisma.RolePermissionCreateWithoutPermissionInput[] | Prisma.RolePermissionUncheckedCreateWithoutPermissionInput[];
    connectOrCreate?: Prisma.RolePermissionCreateOrConnectWithoutPermissionInput | Prisma.RolePermissionCreateOrConnectWithoutPermissionInput[];
    upsert?: Prisma.RolePermissionUpsertWithWhereUniqueWithoutPermissionInput | Prisma.RolePermissionUpsertWithWhereUniqueWithoutPermissionInput[];
    createMany?: Prisma.RolePermissionCreateManyPermissionInputEnvelope;
    set?: Prisma.RolePermissionWhereUniqueInput | Prisma.RolePermissionWhereUniqueInput[];
    disconnect?: Prisma.RolePermissionWhereUniqueInput | Prisma.RolePermissionWhereUniqueInput[];
    delete?: Prisma.RolePermissionWhereUniqueInput | Prisma.RolePermissionWhereUniqueInput[];
    connect?: Prisma.RolePermissionWhereUniqueInput | Prisma.RolePermissionWhereUniqueInput[];
    update?: Prisma.RolePermissionUpdateWithWhereUniqueWithoutPermissionInput | Prisma.RolePermissionUpdateWithWhereUniqueWithoutPermissionInput[];
    updateMany?: Prisma.RolePermissionUpdateManyWithWhereWithoutPermissionInput | Prisma.RolePermissionUpdateManyWithWhereWithoutPermissionInput[];
    deleteMany?: Prisma.RolePermissionScalarWhereInput | Prisma.RolePermissionScalarWhereInput[];
};
export type RolePermissionCreateWithoutRoleInput = {
    permission: Prisma.PermissionCreateNestedOneWithoutRolesInput;
};
export type RolePermissionUncheckedCreateWithoutRoleInput = {
    permissionId: number;
};
export type RolePermissionCreateOrConnectWithoutRoleInput = {
    where: Prisma.RolePermissionWhereUniqueInput;
    create: Prisma.XOR<Prisma.RolePermissionCreateWithoutRoleInput, Prisma.RolePermissionUncheckedCreateWithoutRoleInput>;
};
export type RolePermissionCreateManyRoleInputEnvelope = {
    data: Prisma.RolePermissionCreateManyRoleInput | Prisma.RolePermissionCreateManyRoleInput[];
    skipDuplicates?: boolean;
};
export type RolePermissionUpsertWithWhereUniqueWithoutRoleInput = {
    where: Prisma.RolePermissionWhereUniqueInput;
    update: Prisma.XOR<Prisma.RolePermissionUpdateWithoutRoleInput, Prisma.RolePermissionUncheckedUpdateWithoutRoleInput>;
    create: Prisma.XOR<Prisma.RolePermissionCreateWithoutRoleInput, Prisma.RolePermissionUncheckedCreateWithoutRoleInput>;
};
export type RolePermissionUpdateWithWhereUniqueWithoutRoleInput = {
    where: Prisma.RolePermissionWhereUniqueInput;
    data: Prisma.XOR<Prisma.RolePermissionUpdateWithoutRoleInput, Prisma.RolePermissionUncheckedUpdateWithoutRoleInput>;
};
export type RolePermissionUpdateManyWithWhereWithoutRoleInput = {
    where: Prisma.RolePermissionScalarWhereInput;
    data: Prisma.XOR<Prisma.RolePermissionUpdateManyMutationInput, Prisma.RolePermissionUncheckedUpdateManyWithoutRoleInput>;
};
export type RolePermissionScalarWhereInput = {
    AND?: Prisma.RolePermissionScalarWhereInput | Prisma.RolePermissionScalarWhereInput[];
    OR?: Prisma.RolePermissionScalarWhereInput[];
    NOT?: Prisma.RolePermissionScalarWhereInput | Prisma.RolePermissionScalarWhereInput[];
    roleId?: Prisma.IntFilter<"RolePermission"> | number;
    permissionId?: Prisma.IntFilter<"RolePermission"> | number;
};
export type RolePermissionCreateWithoutPermissionInput = {
    role: Prisma.RoleCreateNestedOneWithoutPermissionsInput;
};
export type RolePermissionUncheckedCreateWithoutPermissionInput = {
    roleId: number;
};
export type RolePermissionCreateOrConnectWithoutPermissionInput = {
    where: Prisma.RolePermissionWhereUniqueInput;
    create: Prisma.XOR<Prisma.RolePermissionCreateWithoutPermissionInput, Prisma.RolePermissionUncheckedCreateWithoutPermissionInput>;
};
export type RolePermissionCreateManyPermissionInputEnvelope = {
    data: Prisma.RolePermissionCreateManyPermissionInput | Prisma.RolePermissionCreateManyPermissionInput[];
    skipDuplicates?: boolean;
};
export type RolePermissionUpsertWithWhereUniqueWithoutPermissionInput = {
    where: Prisma.RolePermissionWhereUniqueInput;
    update: Prisma.XOR<Prisma.RolePermissionUpdateWithoutPermissionInput, Prisma.RolePermissionUncheckedUpdateWithoutPermissionInput>;
    create: Prisma.XOR<Prisma.RolePermissionCreateWithoutPermissionInput, Prisma.RolePermissionUncheckedCreateWithoutPermissionInput>;
};
export type RolePermissionUpdateWithWhereUniqueWithoutPermissionInput = {
    where: Prisma.RolePermissionWhereUniqueInput;
    data: Prisma.XOR<Prisma.RolePermissionUpdateWithoutPermissionInput, Prisma.RolePermissionUncheckedUpdateWithoutPermissionInput>;
};
export type RolePermissionUpdateManyWithWhereWithoutPermissionInput = {
    where: Prisma.RolePermissionScalarWhereInput;
    data: Prisma.XOR<Prisma.RolePermissionUpdateManyMutationInput, Prisma.RolePermissionUncheckedUpdateManyWithoutPermissionInput>;
};
export type RolePermissionCreateManyRoleInput = {
    permissionId: number;
};
export type RolePermissionUpdateWithoutRoleInput = {
    permission?: Prisma.PermissionUpdateOneRequiredWithoutRolesNestedInput;
};
export type RolePermissionUncheckedUpdateWithoutRoleInput = {
    permissionId?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type RolePermissionUncheckedUpdateManyWithoutRoleInput = {
    permissionId?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type RolePermissionCreateManyPermissionInput = {
    roleId: number;
};
export type RolePermissionUpdateWithoutPermissionInput = {
    role?: Prisma.RoleUpdateOneRequiredWithoutPermissionsNestedInput;
};
export type RolePermissionUncheckedUpdateWithoutPermissionInput = {
    roleId?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type RolePermissionUncheckedUpdateManyWithoutPermissionInput = {
    roleId?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type RolePermissionSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    roleId?: boolean;
    permissionId?: boolean;
    role?: boolean | Prisma.RoleDefaultArgs<ExtArgs>;
    permission?: boolean | Prisma.PermissionDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["rolePermission"]>;
export type RolePermissionSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    roleId?: boolean;
    permissionId?: boolean;
    role?: boolean | Prisma.RoleDefaultArgs<ExtArgs>;
    permission?: boolean | Prisma.PermissionDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["rolePermission"]>;
export type RolePermissionSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    roleId?: boolean;
    permissionId?: boolean;
    role?: boolean | Prisma.RoleDefaultArgs<ExtArgs>;
    permission?: boolean | Prisma.PermissionDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["rolePermission"]>;
export type RolePermissionSelectScalar = {
    roleId?: boolean;
    permissionId?: boolean;
};
export type RolePermissionOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"roleId" | "permissionId", ExtArgs["result"]["rolePermission"]>;
export type RolePermissionInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    role?: boolean | Prisma.RoleDefaultArgs<ExtArgs>;
    permission?: boolean | Prisma.PermissionDefaultArgs<ExtArgs>;
};
export type RolePermissionIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    role?: boolean | Prisma.RoleDefaultArgs<ExtArgs>;
    permission?: boolean | Prisma.PermissionDefaultArgs<ExtArgs>;
};
export type RolePermissionIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    role?: boolean | Prisma.RoleDefaultArgs<ExtArgs>;
    permission?: boolean | Prisma.PermissionDefaultArgs<ExtArgs>;
};
export type $RolePermissionPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "RolePermission";
    objects: {
        role: Prisma.$RolePayload<ExtArgs>;
        permission: Prisma.$PermissionPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        roleId: number;
        permissionId: number;
    }, ExtArgs["result"]["rolePermission"]>;
    composites: {};
};
export type RolePermissionGetPayload<S extends boolean | null | undefined | RolePermissionDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$RolePermissionPayload, S>;
export type RolePermissionCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<RolePermissionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: RolePermissionCountAggregateInputType | true;
};
export interface RolePermissionDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['RolePermission'];
        meta: {
            name: 'RolePermission';
        };
    };
    findUnique<T extends RolePermissionFindUniqueArgs>(args: Prisma.SelectSubset<T, RolePermissionFindUniqueArgs<ExtArgs>>): Prisma.Prisma__RolePermissionClient<runtime.Types.Result.GetResult<Prisma.$RolePermissionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends RolePermissionFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, RolePermissionFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__RolePermissionClient<runtime.Types.Result.GetResult<Prisma.$RolePermissionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends RolePermissionFindFirstArgs>(args?: Prisma.SelectSubset<T, RolePermissionFindFirstArgs<ExtArgs>>): Prisma.Prisma__RolePermissionClient<runtime.Types.Result.GetResult<Prisma.$RolePermissionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends RolePermissionFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, RolePermissionFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__RolePermissionClient<runtime.Types.Result.GetResult<Prisma.$RolePermissionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends RolePermissionFindManyArgs>(args?: Prisma.SelectSubset<T, RolePermissionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RolePermissionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends RolePermissionCreateArgs>(args: Prisma.SelectSubset<T, RolePermissionCreateArgs<ExtArgs>>): Prisma.Prisma__RolePermissionClient<runtime.Types.Result.GetResult<Prisma.$RolePermissionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends RolePermissionCreateManyArgs>(args?: Prisma.SelectSubset<T, RolePermissionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends RolePermissionCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, RolePermissionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RolePermissionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends RolePermissionDeleteArgs>(args: Prisma.SelectSubset<T, RolePermissionDeleteArgs<ExtArgs>>): Prisma.Prisma__RolePermissionClient<runtime.Types.Result.GetResult<Prisma.$RolePermissionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends RolePermissionUpdateArgs>(args: Prisma.SelectSubset<T, RolePermissionUpdateArgs<ExtArgs>>): Prisma.Prisma__RolePermissionClient<runtime.Types.Result.GetResult<Prisma.$RolePermissionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends RolePermissionDeleteManyArgs>(args?: Prisma.SelectSubset<T, RolePermissionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends RolePermissionUpdateManyArgs>(args: Prisma.SelectSubset<T, RolePermissionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends RolePermissionUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, RolePermissionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RolePermissionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends RolePermissionUpsertArgs>(args: Prisma.SelectSubset<T, RolePermissionUpsertArgs<ExtArgs>>): Prisma.Prisma__RolePermissionClient<runtime.Types.Result.GetResult<Prisma.$RolePermissionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends RolePermissionCountArgs>(args?: Prisma.Subset<T, RolePermissionCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], RolePermissionCountAggregateOutputType> : number>;
    aggregate<T extends RolePermissionAggregateArgs>(args: Prisma.Subset<T, RolePermissionAggregateArgs>): Prisma.PrismaPromise<GetRolePermissionAggregateType<T>>;
    groupBy<T extends RolePermissionGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: RolePermissionGroupByArgs['orderBy'];
    } : {
        orderBy?: RolePermissionGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, RolePermissionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRolePermissionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: RolePermissionFieldRefs;
}
export interface Prisma__RolePermissionClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    role<T extends Prisma.RoleDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.RoleDefaultArgs<ExtArgs>>): Prisma.Prisma__RoleClient<runtime.Types.Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    permission<T extends Prisma.PermissionDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.PermissionDefaultArgs<ExtArgs>>): Prisma.Prisma__PermissionClient<runtime.Types.Result.GetResult<Prisma.$PermissionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface RolePermissionFieldRefs {
    readonly roleId: Prisma.FieldRef<"RolePermission", 'Int'>;
    readonly permissionId: Prisma.FieldRef<"RolePermission", 'Int'>;
}
export type RolePermissionFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RolePermissionSelect<ExtArgs> | null;
    omit?: Prisma.RolePermissionOmit<ExtArgs> | null;
    include?: Prisma.RolePermissionInclude<ExtArgs> | null;
    where: Prisma.RolePermissionWhereUniqueInput;
};
export type RolePermissionFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RolePermissionSelect<ExtArgs> | null;
    omit?: Prisma.RolePermissionOmit<ExtArgs> | null;
    include?: Prisma.RolePermissionInclude<ExtArgs> | null;
    where: Prisma.RolePermissionWhereUniqueInput;
};
export type RolePermissionFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RolePermissionSelect<ExtArgs> | null;
    omit?: Prisma.RolePermissionOmit<ExtArgs> | null;
    include?: Prisma.RolePermissionInclude<ExtArgs> | null;
    where?: Prisma.RolePermissionWhereInput;
    orderBy?: Prisma.RolePermissionOrderByWithRelationInput | Prisma.RolePermissionOrderByWithRelationInput[];
    cursor?: Prisma.RolePermissionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.RolePermissionScalarFieldEnum | Prisma.RolePermissionScalarFieldEnum[];
};
export type RolePermissionFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RolePermissionSelect<ExtArgs> | null;
    omit?: Prisma.RolePermissionOmit<ExtArgs> | null;
    include?: Prisma.RolePermissionInclude<ExtArgs> | null;
    where?: Prisma.RolePermissionWhereInput;
    orderBy?: Prisma.RolePermissionOrderByWithRelationInput | Prisma.RolePermissionOrderByWithRelationInput[];
    cursor?: Prisma.RolePermissionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.RolePermissionScalarFieldEnum | Prisma.RolePermissionScalarFieldEnum[];
};
export type RolePermissionFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RolePermissionSelect<ExtArgs> | null;
    omit?: Prisma.RolePermissionOmit<ExtArgs> | null;
    include?: Prisma.RolePermissionInclude<ExtArgs> | null;
    where?: Prisma.RolePermissionWhereInput;
    orderBy?: Prisma.RolePermissionOrderByWithRelationInput | Prisma.RolePermissionOrderByWithRelationInput[];
    cursor?: Prisma.RolePermissionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.RolePermissionScalarFieldEnum | Prisma.RolePermissionScalarFieldEnum[];
};
export type RolePermissionCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RolePermissionSelect<ExtArgs> | null;
    omit?: Prisma.RolePermissionOmit<ExtArgs> | null;
    include?: Prisma.RolePermissionInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.RolePermissionCreateInput, Prisma.RolePermissionUncheckedCreateInput>;
};
export type RolePermissionCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.RolePermissionCreateManyInput | Prisma.RolePermissionCreateManyInput[];
    skipDuplicates?: boolean;
};
export type RolePermissionCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RolePermissionSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.RolePermissionOmit<ExtArgs> | null;
    data: Prisma.RolePermissionCreateManyInput | Prisma.RolePermissionCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.RolePermissionIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type RolePermissionUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RolePermissionSelect<ExtArgs> | null;
    omit?: Prisma.RolePermissionOmit<ExtArgs> | null;
    include?: Prisma.RolePermissionInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.RolePermissionUpdateInput, Prisma.RolePermissionUncheckedUpdateInput>;
    where: Prisma.RolePermissionWhereUniqueInput;
};
export type RolePermissionUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.RolePermissionUpdateManyMutationInput, Prisma.RolePermissionUncheckedUpdateManyInput>;
    where?: Prisma.RolePermissionWhereInput;
    limit?: number;
};
export type RolePermissionUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RolePermissionSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.RolePermissionOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.RolePermissionUpdateManyMutationInput, Prisma.RolePermissionUncheckedUpdateManyInput>;
    where?: Prisma.RolePermissionWhereInput;
    limit?: number;
    include?: Prisma.RolePermissionIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type RolePermissionUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RolePermissionSelect<ExtArgs> | null;
    omit?: Prisma.RolePermissionOmit<ExtArgs> | null;
    include?: Prisma.RolePermissionInclude<ExtArgs> | null;
    where: Prisma.RolePermissionWhereUniqueInput;
    create: Prisma.XOR<Prisma.RolePermissionCreateInput, Prisma.RolePermissionUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.RolePermissionUpdateInput, Prisma.RolePermissionUncheckedUpdateInput>;
};
export type RolePermissionDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RolePermissionSelect<ExtArgs> | null;
    omit?: Prisma.RolePermissionOmit<ExtArgs> | null;
    include?: Prisma.RolePermissionInclude<ExtArgs> | null;
    where: Prisma.RolePermissionWhereUniqueInput;
};
export type RolePermissionDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.RolePermissionWhereInput;
    limit?: number;
};
export type RolePermissionDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RolePermissionSelect<ExtArgs> | null;
    omit?: Prisma.RolePermissionOmit<ExtArgs> | null;
    include?: Prisma.RolePermissionInclude<ExtArgs> | null;
};
