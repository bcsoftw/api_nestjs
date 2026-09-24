import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type PermissionModel = runtime.Types.Result.DefaultSelection<Prisma.$PermissionPayload>;
export type AggregatePermission = {
    _count: PermissionCountAggregateOutputType | null;
    _avg: PermissionAvgAggregateOutputType | null;
    _sum: PermissionSumAggregateOutputType | null;
    _min: PermissionMinAggregateOutputType | null;
    _max: PermissionMaxAggregateOutputType | null;
};
export type PermissionAvgAggregateOutputType = {
    id: number | null;
};
export type PermissionSumAggregateOutputType = {
    id: number | null;
};
export type PermissionMinAggregateOutputType = {
    id: number | null;
    name: string | null;
};
export type PermissionMaxAggregateOutputType = {
    id: number | null;
    name: string | null;
};
export type PermissionCountAggregateOutputType = {
    id: number;
    name: number;
    _all: number;
};
export type PermissionAvgAggregateInputType = {
    id?: true;
};
export type PermissionSumAggregateInputType = {
    id?: true;
};
export type PermissionMinAggregateInputType = {
    id?: true;
    name?: true;
};
export type PermissionMaxAggregateInputType = {
    id?: true;
    name?: true;
};
export type PermissionCountAggregateInputType = {
    id?: true;
    name?: true;
    _all?: true;
};
export type PermissionAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PermissionWhereInput;
    orderBy?: Prisma.PermissionOrderByWithRelationInput | Prisma.PermissionOrderByWithRelationInput[];
    cursor?: Prisma.PermissionWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | PermissionCountAggregateInputType;
    _avg?: PermissionAvgAggregateInputType;
    _sum?: PermissionSumAggregateInputType;
    _min?: PermissionMinAggregateInputType;
    _max?: PermissionMaxAggregateInputType;
};
export type GetPermissionAggregateType<T extends PermissionAggregateArgs> = {
    [P in keyof T & keyof AggregatePermission]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregatePermission[P]> : Prisma.GetScalarType<T[P], AggregatePermission[P]>;
};
export type PermissionGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PermissionWhereInput;
    orderBy?: Prisma.PermissionOrderByWithAggregationInput | Prisma.PermissionOrderByWithAggregationInput[];
    by: Prisma.PermissionScalarFieldEnum[] | Prisma.PermissionScalarFieldEnum;
    having?: Prisma.PermissionScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: PermissionCountAggregateInputType | true;
    _avg?: PermissionAvgAggregateInputType;
    _sum?: PermissionSumAggregateInputType;
    _min?: PermissionMinAggregateInputType;
    _max?: PermissionMaxAggregateInputType;
};
export type PermissionGroupByOutputType = {
    id: number;
    name: string;
    _count: PermissionCountAggregateOutputType | null;
    _avg: PermissionAvgAggregateOutputType | null;
    _sum: PermissionSumAggregateOutputType | null;
    _min: PermissionMinAggregateOutputType | null;
    _max: PermissionMaxAggregateOutputType | null;
};
export type GetPermissionGroupByPayload<T extends PermissionGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<PermissionGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof PermissionGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], PermissionGroupByOutputType[P]> : Prisma.GetScalarType<T[P], PermissionGroupByOutputType[P]>;
}>>;
export type PermissionWhereInput = {
    AND?: Prisma.PermissionWhereInput | Prisma.PermissionWhereInput[];
    OR?: Prisma.PermissionWhereInput[];
    NOT?: Prisma.PermissionWhereInput | Prisma.PermissionWhereInput[];
    id?: Prisma.IntFilter<"Permission"> | number;
    name?: Prisma.StringFilter<"Permission"> | string;
    roles?: Prisma.RolePermissionListRelationFilter;
};
export type PermissionOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    roles?: Prisma.RolePermissionOrderByRelationAggregateInput;
};
export type PermissionWhereUniqueInput = Prisma.AtLeast<{
    id?: number;
    name?: string;
    AND?: Prisma.PermissionWhereInput | Prisma.PermissionWhereInput[];
    OR?: Prisma.PermissionWhereInput[];
    NOT?: Prisma.PermissionWhereInput | Prisma.PermissionWhereInput[];
    roles?: Prisma.RolePermissionListRelationFilter;
}, "id" | "name">;
export type PermissionOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    _count?: Prisma.PermissionCountOrderByAggregateInput;
    _avg?: Prisma.PermissionAvgOrderByAggregateInput;
    _max?: Prisma.PermissionMaxOrderByAggregateInput;
    _min?: Prisma.PermissionMinOrderByAggregateInput;
    _sum?: Prisma.PermissionSumOrderByAggregateInput;
};
export type PermissionScalarWhereWithAggregatesInput = {
    AND?: Prisma.PermissionScalarWhereWithAggregatesInput | Prisma.PermissionScalarWhereWithAggregatesInput[];
    OR?: Prisma.PermissionScalarWhereWithAggregatesInput[];
    NOT?: Prisma.PermissionScalarWhereWithAggregatesInput | Prisma.PermissionScalarWhereWithAggregatesInput[];
    id?: Prisma.IntWithAggregatesFilter<"Permission"> | number;
    name?: Prisma.StringWithAggregatesFilter<"Permission"> | string;
};
export type PermissionCreateInput = {
    name: string;
    roles?: Prisma.RolePermissionCreateNestedManyWithoutPermissionInput;
};
export type PermissionUncheckedCreateInput = {
    id?: number;
    name: string;
    roles?: Prisma.RolePermissionUncheckedCreateNestedManyWithoutPermissionInput;
};
export type PermissionUpdateInput = {
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    roles?: Prisma.RolePermissionUpdateManyWithoutPermissionNestedInput;
};
export type PermissionUncheckedUpdateInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    roles?: Prisma.RolePermissionUncheckedUpdateManyWithoutPermissionNestedInput;
};
export type PermissionCreateManyInput = {
    id?: number;
    name: string;
};
export type PermissionUpdateManyMutationInput = {
    name?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type PermissionUncheckedUpdateManyInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type PermissionCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
};
export type PermissionAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
};
export type PermissionMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
};
export type PermissionMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
};
export type PermissionSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
};
export type PermissionScalarRelationFilter = {
    is?: Prisma.PermissionWhereInput;
    isNot?: Prisma.PermissionWhereInput;
};
export type PermissionCreateNestedOneWithoutRolesInput = {
    create?: Prisma.XOR<Prisma.PermissionCreateWithoutRolesInput, Prisma.PermissionUncheckedCreateWithoutRolesInput>;
    connectOrCreate?: Prisma.PermissionCreateOrConnectWithoutRolesInput;
    connect?: Prisma.PermissionWhereUniqueInput;
};
export type PermissionUpdateOneRequiredWithoutRolesNestedInput = {
    create?: Prisma.XOR<Prisma.PermissionCreateWithoutRolesInput, Prisma.PermissionUncheckedCreateWithoutRolesInput>;
    connectOrCreate?: Prisma.PermissionCreateOrConnectWithoutRolesInput;
    upsert?: Prisma.PermissionUpsertWithoutRolesInput;
    connect?: Prisma.PermissionWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.PermissionUpdateToOneWithWhereWithoutRolesInput, Prisma.PermissionUpdateWithoutRolesInput>, Prisma.PermissionUncheckedUpdateWithoutRolesInput>;
};
export type PermissionCreateWithoutRolesInput = {
    name: string;
};
export type PermissionUncheckedCreateWithoutRolesInput = {
    id?: number;
    name: string;
};
export type PermissionCreateOrConnectWithoutRolesInput = {
    where: Prisma.PermissionWhereUniqueInput;
    create: Prisma.XOR<Prisma.PermissionCreateWithoutRolesInput, Prisma.PermissionUncheckedCreateWithoutRolesInput>;
};
export type PermissionUpsertWithoutRolesInput = {
    update: Prisma.XOR<Prisma.PermissionUpdateWithoutRolesInput, Prisma.PermissionUncheckedUpdateWithoutRolesInput>;
    create: Prisma.XOR<Prisma.PermissionCreateWithoutRolesInput, Prisma.PermissionUncheckedCreateWithoutRolesInput>;
    where?: Prisma.PermissionWhereInput;
};
export type PermissionUpdateToOneWithWhereWithoutRolesInput = {
    where?: Prisma.PermissionWhereInput;
    data: Prisma.XOR<Prisma.PermissionUpdateWithoutRolesInput, Prisma.PermissionUncheckedUpdateWithoutRolesInput>;
};
export type PermissionUpdateWithoutRolesInput = {
    name?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type PermissionUncheckedUpdateWithoutRolesInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type PermissionCountOutputType = {
    roles: number;
};
export type PermissionCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    roles?: boolean | PermissionCountOutputTypeCountRolesArgs;
};
export type PermissionCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PermissionCountOutputTypeSelect<ExtArgs> | null;
};
export type PermissionCountOutputTypeCountRolesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.RolePermissionWhereInput;
};
export type PermissionSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    roles?: boolean | Prisma.Permission$rolesArgs<ExtArgs>;
    _count?: boolean | Prisma.PermissionCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["permission"]>;
export type PermissionSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
}, ExtArgs["result"]["permission"]>;
export type PermissionSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
}, ExtArgs["result"]["permission"]>;
export type PermissionSelectScalar = {
    id?: boolean;
    name?: boolean;
};
export type PermissionOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "name", ExtArgs["result"]["permission"]>;
export type PermissionInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    roles?: boolean | Prisma.Permission$rolesArgs<ExtArgs>;
    _count?: boolean | Prisma.PermissionCountOutputTypeDefaultArgs<ExtArgs>;
};
export type PermissionIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type PermissionIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type $PermissionPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Permission";
    objects: {
        roles: Prisma.$RolePermissionPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: number;
        name: string;
    }, ExtArgs["result"]["permission"]>;
    composites: {};
};
export type PermissionGetPayload<S extends boolean | null | undefined | PermissionDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$PermissionPayload, S>;
export type PermissionCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<PermissionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: PermissionCountAggregateInputType | true;
};
export interface PermissionDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Permission'];
        meta: {
            name: 'Permission';
        };
    };
    findUnique<T extends PermissionFindUniqueArgs>(args: Prisma.SelectSubset<T, PermissionFindUniqueArgs<ExtArgs>>): Prisma.Prisma__PermissionClient<runtime.Types.Result.GetResult<Prisma.$PermissionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends PermissionFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, PermissionFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__PermissionClient<runtime.Types.Result.GetResult<Prisma.$PermissionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends PermissionFindFirstArgs>(args?: Prisma.SelectSubset<T, PermissionFindFirstArgs<ExtArgs>>): Prisma.Prisma__PermissionClient<runtime.Types.Result.GetResult<Prisma.$PermissionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends PermissionFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, PermissionFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__PermissionClient<runtime.Types.Result.GetResult<Prisma.$PermissionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends PermissionFindManyArgs>(args?: Prisma.SelectSubset<T, PermissionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PermissionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends PermissionCreateArgs>(args: Prisma.SelectSubset<T, PermissionCreateArgs<ExtArgs>>): Prisma.Prisma__PermissionClient<runtime.Types.Result.GetResult<Prisma.$PermissionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends PermissionCreateManyArgs>(args?: Prisma.SelectSubset<T, PermissionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends PermissionCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, PermissionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PermissionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends PermissionDeleteArgs>(args: Prisma.SelectSubset<T, PermissionDeleteArgs<ExtArgs>>): Prisma.Prisma__PermissionClient<runtime.Types.Result.GetResult<Prisma.$PermissionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends PermissionUpdateArgs>(args: Prisma.SelectSubset<T, PermissionUpdateArgs<ExtArgs>>): Prisma.Prisma__PermissionClient<runtime.Types.Result.GetResult<Prisma.$PermissionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends PermissionDeleteManyArgs>(args?: Prisma.SelectSubset<T, PermissionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends PermissionUpdateManyArgs>(args: Prisma.SelectSubset<T, PermissionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends PermissionUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, PermissionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PermissionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends PermissionUpsertArgs>(args: Prisma.SelectSubset<T, PermissionUpsertArgs<ExtArgs>>): Prisma.Prisma__PermissionClient<runtime.Types.Result.GetResult<Prisma.$PermissionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends PermissionCountArgs>(args?: Prisma.Subset<T, PermissionCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], PermissionCountAggregateOutputType> : number>;
    aggregate<T extends PermissionAggregateArgs>(args: Prisma.Subset<T, PermissionAggregateArgs>): Prisma.PrismaPromise<GetPermissionAggregateType<T>>;
    groupBy<T extends PermissionGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: PermissionGroupByArgs['orderBy'];
    } : {
        orderBy?: PermissionGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, PermissionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPermissionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: PermissionFieldRefs;
}
export interface Prisma__PermissionClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    roles<T extends Prisma.Permission$rolesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Permission$rolesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RolePermissionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface PermissionFieldRefs {
    readonly id: Prisma.FieldRef<"Permission", 'Int'>;
    readonly name: Prisma.FieldRef<"Permission", 'String'>;
}
export type PermissionFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PermissionSelect<ExtArgs> | null;
    omit?: Prisma.PermissionOmit<ExtArgs> | null;
    include?: Prisma.PermissionInclude<ExtArgs> | null;
    where: Prisma.PermissionWhereUniqueInput;
};
export type PermissionFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PermissionSelect<ExtArgs> | null;
    omit?: Prisma.PermissionOmit<ExtArgs> | null;
    include?: Prisma.PermissionInclude<ExtArgs> | null;
    where: Prisma.PermissionWhereUniqueInput;
};
export type PermissionFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PermissionSelect<ExtArgs> | null;
    omit?: Prisma.PermissionOmit<ExtArgs> | null;
    include?: Prisma.PermissionInclude<ExtArgs> | null;
    where?: Prisma.PermissionWhereInput;
    orderBy?: Prisma.PermissionOrderByWithRelationInput | Prisma.PermissionOrderByWithRelationInput[];
    cursor?: Prisma.PermissionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PermissionScalarFieldEnum | Prisma.PermissionScalarFieldEnum[];
};
export type PermissionFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PermissionSelect<ExtArgs> | null;
    omit?: Prisma.PermissionOmit<ExtArgs> | null;
    include?: Prisma.PermissionInclude<ExtArgs> | null;
    where?: Prisma.PermissionWhereInput;
    orderBy?: Prisma.PermissionOrderByWithRelationInput | Prisma.PermissionOrderByWithRelationInput[];
    cursor?: Prisma.PermissionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PermissionScalarFieldEnum | Prisma.PermissionScalarFieldEnum[];
};
export type PermissionFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PermissionSelect<ExtArgs> | null;
    omit?: Prisma.PermissionOmit<ExtArgs> | null;
    include?: Prisma.PermissionInclude<ExtArgs> | null;
    where?: Prisma.PermissionWhereInput;
    orderBy?: Prisma.PermissionOrderByWithRelationInput | Prisma.PermissionOrderByWithRelationInput[];
    cursor?: Prisma.PermissionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PermissionScalarFieldEnum | Prisma.PermissionScalarFieldEnum[];
};
export type PermissionCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PermissionSelect<ExtArgs> | null;
    omit?: Prisma.PermissionOmit<ExtArgs> | null;
    include?: Prisma.PermissionInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PermissionCreateInput, Prisma.PermissionUncheckedCreateInput>;
};
export type PermissionCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.PermissionCreateManyInput | Prisma.PermissionCreateManyInput[];
    skipDuplicates?: boolean;
};
export type PermissionCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PermissionSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.PermissionOmit<ExtArgs> | null;
    data: Prisma.PermissionCreateManyInput | Prisma.PermissionCreateManyInput[];
    skipDuplicates?: boolean;
};
export type PermissionUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PermissionSelect<ExtArgs> | null;
    omit?: Prisma.PermissionOmit<ExtArgs> | null;
    include?: Prisma.PermissionInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PermissionUpdateInput, Prisma.PermissionUncheckedUpdateInput>;
    where: Prisma.PermissionWhereUniqueInput;
};
export type PermissionUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.PermissionUpdateManyMutationInput, Prisma.PermissionUncheckedUpdateManyInput>;
    where?: Prisma.PermissionWhereInput;
    limit?: number;
};
export type PermissionUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PermissionSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.PermissionOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PermissionUpdateManyMutationInput, Prisma.PermissionUncheckedUpdateManyInput>;
    where?: Prisma.PermissionWhereInput;
    limit?: number;
};
export type PermissionUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PermissionSelect<ExtArgs> | null;
    omit?: Prisma.PermissionOmit<ExtArgs> | null;
    include?: Prisma.PermissionInclude<ExtArgs> | null;
    where: Prisma.PermissionWhereUniqueInput;
    create: Prisma.XOR<Prisma.PermissionCreateInput, Prisma.PermissionUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.PermissionUpdateInput, Prisma.PermissionUncheckedUpdateInput>;
};
export type PermissionDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PermissionSelect<ExtArgs> | null;
    omit?: Prisma.PermissionOmit<ExtArgs> | null;
    include?: Prisma.PermissionInclude<ExtArgs> | null;
    where: Prisma.PermissionWhereUniqueInput;
};
export type PermissionDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PermissionWhereInput;
    limit?: number;
};
export type Permission$rolesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type PermissionDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PermissionSelect<ExtArgs> | null;
    omit?: Prisma.PermissionOmit<ExtArgs> | null;
    include?: Prisma.PermissionInclude<ExtArgs> | null;
};
